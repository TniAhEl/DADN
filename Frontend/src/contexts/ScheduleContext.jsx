import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import axios from "axios";

const SCHEDULE_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_DATA: "SET_DATA",
  ADD_EVENT: "ADD_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
  SET_SENSOR_DATA: "SET_SENSOR_DATA",
};

const initialState = {
  events: [],
  history: [],
  sensorData: { moisture: null, temperature: null },
  loading: true,
  error: null,
  lastFetch: null,
};

const scheduleReducer = (state, action) => {
  switch (action.type) {
    case SCHEDULE_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error,
      };
    case SCHEDULE_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SCHEDULE_ACTIONS.SET_DATA:
      return {
        ...state,
        events: action.payload.events,
        history: action.payload.history,
        sensorData: action.payload.sensorData,
        loading: false,
        error: null,
        lastFetch: new Date().toISOString(),
      };
    case SCHEDULE_ACTIONS.ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        ),
      };
    case SCHEDULE_ACTIONS.UPDATE_EVENT:
      return {
        ...state,
        events: state.events
          .map((event) =>
            event._id === action.payload.id ? action.payload.data : event
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date)),
      };
    case SCHEDULE_ACTIONS.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };
    case SCHEDULE_ACTIONS.SET_SENSOR_DATA:
      return {
        ...state,
        sensorData: action.payload,
      };
    default:
      return state;
  }
};

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);
  const lastFetchRef = useRef(null);

  // Sync state.lastFetch to ref
  useEffect(() => {
    lastFetchRef.current = state.lastFetch;
  }, [state.lastFetch]);

  const api = useMemo(() => {
    const baseURL = "http://localhost:3000/api/v1";
    return axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        console.log(
          `API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [api]);

  const formatScheduleDate = useCallback((dateString) => {
    const dateObj = new Date(dateString);
    return {
      date: dateObj.toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
      time: dateObj.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    };
  }, []);

  const processScheduleData = useCallback(
    (schedules, sensorData) => {
      const now = new Date();

      const pastSchedules = schedules.filter(
        (item) => new Date(item.date) < now
      );
      const futureSchedules = schedules.filter(
        (item) => new Date(item.date) >= now
      );

      const history = pastSchedules
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sắp xếp trước
        .slice(0, 10)
        .map((item) => {
          const { date, time } = formatScheduleDate(item.date);
          return {
            id: item._id,
            date,
            time,
            moisture: sensorData.moisture ?? "N/A",
            temperature: sensorData.temperature ?? "N/A",
            title: item.title || item.name,
          };
        });

      return {
        events: futureSchedules.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        ),
        history: history.slice(0, 5),
        sensorData,
      };
    },
    [formatScheduleDate]
  );

  const fetchSchedules = useCallback(
    async (retryCount = 0) => {
      const MAX_RETRIES = 3;

      try {
        dispatch({ type: SCHEDULE_ACTIONS.SET_LOADING, payload: true });

        const [scheduleRes, moistureRes, tempRes] = await Promise.allSettled([
          api.get("/watering-schedule"),
          api.get("/dht-moisure/latest"),
          api.get("/dht-temp/latest"),
        ]);

        const schedules =
          scheduleRes.status === "fulfilled"
            ? scheduleRes.value.data.schedules || []
            : [];

        const moisture =
          moistureRes.status === "fulfilled"
            ? moistureRes.value.data?.data?.value
            : null;

        const temperature =
          tempRes.status === "fulfilled"
            ? tempRes.value.data?.data?.value
            : null;

        const sensorData = { moisture, temperature };
        const processedData = processScheduleData(schedules, sensorData);

        dispatch({
          type: SCHEDULE_ACTIONS.SET_DATA,
          payload: processedData,
        });
      } catch (err) {
        if (retryCount < MAX_RETRIES) {
          setTimeout(
            () => fetchSchedules(retryCount + 1),
            2000 * (retryCount + 1)
          );
          return;
        }
        dispatch({
          type: SCHEDULE_ACTIONS.SET_ERROR,
          payload: "Could not load schedule data after multiple attempts",
        });
      }
    },
    [api, processScheduleData]
  );

  const debouncedRefresh = useCallback(
    debounce(() => fetchSchedules(), 1000),
    [fetchSchedules]
  );

  useEffect(() => {
    fetchSchedules();

    const interval = setInterval(() => {
      const lastFetch = new Date(lastFetchRef.current || 0);
      const now = new Date();
      const timeDiff = now - lastFetch;

      if (timeDiff > 30000) {
        fetchSchedules();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchSchedules]);

  const addSchedule = useCallback(
    async (scheduleData) => {
      try {
        if (!scheduleData.title || !scheduleData.date) {
          return { success: false, message: "Title and date are required" };
        }

        const response = await api.post("/watering-schedule", scheduleData);
        const newSchedule = response.data.schedule;

        dispatch({
          type: SCHEDULE_ACTIONS.ADD_EVENT,
          payload: newSchedule,
        });

        debouncedRefresh();

        return {
          success: true,
          message: "Schedule added successfully",
          data: newSchedule,
        };
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Could not add schedule";
        return { success: false, message: errorMessage };
      }
    },
    [api, debouncedRefresh]
  );

  const deleteSchedule = useCallback(
    async (scheduleId) => {
      try {
        dispatch({ type: SCHEDULE_ACTIONS.DELETE_EVENT, payload: scheduleId });

        await api.delete(`/watering-schedule/${scheduleId}`);
        return { success: true, message: "Schedule deleted successfully" };
      } catch (err) {
        fetchSchedules();
        const errorMessage =
          err.response?.data?.message || "Could not delete schedule";
        return { success: false, message: errorMessage };
      }
    },
    [api, fetchSchedules]
  );

  const updateSchedule = useCallback(
    async (scheduleId, updatedData) => {
      try {
        if (!updatedData.title || !updatedData.date) {
          return { success: false, message: "Title and date are required" };
        }

        const response = await api.put(
          `/watering-schedule/${scheduleId}`,
          updatedData
        );
        const updatedSchedule = response.data.schedule;

        dispatch({
          type: SCHEDULE_ACTIONS.UPDATE_EVENT,
          payload: { id: scheduleId, data: updatedSchedule },
        });

        return {
          success: true,
          message: "Schedule updated successfully",
          data: updatedSchedule,
        };
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Could not update schedule";
        return { success: false, message: errorMessage };
      }
    },
    [api]
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      fetchSchedules,
      addSchedule,
      deleteSchedule,
      updateSchedule,
      refreshSensorData: debouncedRefresh,
    }),
    [
      state,
      fetchSchedules,
      addSchedule,
      deleteSchedule,
      updateSchedule,
      debouncedRefresh,
    ]
  );

  return (
    <ScheduleContext.Provider value={contextValue}>
      {children}
    </ScheduleContext.Provider>
  );
};

// Custom Hooks
export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};

export const useUpcomingEvents = (hours = 24) => {
  const { events } = useSchedule();

  return useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now.getTime() + hours * 60 * 60 * 1000);

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= now && eventDate <= cutoff;
    });
  }, [events, hours]);
};

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
