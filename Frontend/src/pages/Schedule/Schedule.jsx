import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { ScheduleProvider, useSchedule } from "../../contexts/ScheduleContext";
import {
  FcAbout,
  FcFullTrash,
  FcCalendar,
  FcClock,
  FcRefresh,
  FcSearch,
  FcCancel,
  FcCheckmark,
  FcInfo,
} from "react-icons/fc";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";
  const icon =
    type === "success" ? (
      <FcCheckmark />
    ) : type === "error" ? (
      <FcCancel />
    ) : (
      <FcInfo />
    );

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in`}
    >
      {icon}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
        ×
      </button>
    </div>
  );
};

const TableSkeleton = ({ rows = 3, cols = 4 }) => (
  <div className="animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4 py-3">
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className="h-4 bg-gray-200 rounded flex-1"></div>
        ))}
      </div>
    ))}
  </div>
);

const ScheduleForm = ({
  formData,
  setFormData,
  isEditing,
  onSubmit,
  onCancel,
  loading,
}) => {
  const formRef = useRef(null);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  const isFormValid = useMemo(() => {
    return formData.title.trim() && formData.datetime;
  }, [formData]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FcCalendar className="mr-2" />
          {isEditing ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
        </h2>
        {isEditing && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FcCancel className="w-6 h-6" />
          </button>
        )}
      </div>

      <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên sự kiện
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Ví dụ: Tưới cây hoa hồng"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày và giờ
          </label>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleInputChange}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
            isFormValid && !loading
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <FcCheckmark />
              <span>{isEditing ? "Cập nhật sự kiện" : "Thêm sự kiện"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const EventsTable = ({
  events,
  onEdit,
  onDelete,
  loading,
  searchTerm,
  setSearchTerm,
}) => {
  const filteredEvents = useMemo(() => {
    if (!searchTerm) return events;
    return events.filter(
      (event) =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  const formatDateTime = useCallback((dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    };
  }, []);

  const getTimeStatus = useCallback((dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const timeDiff = eventDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 0)
      return { status: "overdue", color: "text-red-600", label: "Quá hạn" };
    if (hoursDiff < 2)
      return { status: "urgent", color: "text-orange-600", label: "Gấp" };
    if (hoursDiff < 24)
      return { status: "today", color: "text-yellow-600", label: "Hôm nay" };
    return { status: "upcoming", color: "text-green-600", label: "Sắp tới" };
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FcCalendar className="mr-2" />
          Danh sách sự kiện ({filteredEvents.length})
        </h2>

        <div className="relative">
          <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton rows={3} cols={4} />
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FcInfo className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">
              {searchTerm
                ? "Không tìm thấy sự kiện nào"
                : "Chưa có sự kiện nào"}
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Tên sự kiện
                </th>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Ngày
                </th>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Thời gian
                </th>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => {
                const { date, time } = formatDateTime(event.date);
                const timeStatus = getTimeStatus(event.date);

                return (
                  <tr
                    key={event._id || index}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
                        {event.title || event.name}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{date}</td>
                    <td className="p-4 text-gray-600 flex items-center">
                      <FcClock className="w-4 h-4 mr-1" />
                      {time}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${timeStatus.color} bg-opacity-10`}
                      >
                        {timeStatus.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(event)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                          title="Chỉnh sửa"
                        >
                          <FcAbout className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => onDelete(event._id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                          title="Xóa"
                        >
                          <FcFullTrash className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const HistoryTable = ({ history, loading, onRefresh }) => {
  const getSensorStatus = useCallback((value, type) => {
    if (value === "N/A") return { color: "text-gray-500", status: "unknown" };

    const numValue = parseFloat(value);
    if (type === "moisture") {
      if (numValue < 30) return { color: "text-red-600", status: "low" };
      if (numValue < 60) return { color: "text-yellow-600", status: "medium" };
      return { color: "text-green-600", status: "good" };
    } else {
      // temperature
      if (numValue < 15 || numValue > 35)
        return { color: "text-red-600", status: "extreme" };
      if (numValue < 20 || numValue > 30)
        return { color: "text-yellow-600", status: "suboptimal" };
      return { color: "text-green-600", status: "optimal" };
    }
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FcClock className="mr-2" />
          Lịch sử tưới ({history.length} bản ghi)
        </h2>

        <button
          onClick={onRefresh}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <FcRefresh className="w-4 h-4" />
          <span className="text-sm font-medium text-blue-700">Làm mới</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton rows={5} cols={4} />
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FcInfo className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">Chưa có lịch sử tưới</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-yellow-50 to-yellow-100">
              <tr>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Ngày
                </th>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Thời gian
                </th>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Độ ẩm
                </th>
                <th className="p-4 border-b font-semibold text-gray-700">
                  Nhiệt độ
                </th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 5).map((h, index) => {
                const moistureStatus = getSensorStatus(h.moisture, "moisture");
                const tempStatus = getSensorStatus(
                  h.temperature,
                  "temperature"
                );

                return (
                  <tr
                    key={h.id || index}
                    className="border-b hover:bg-yellow-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600">{h.date}</td>
                    <td className="p-4 text-gray-600">{h.time}</td>
                    <td className="p-4">
                      <span className={`font-medium ${moistureStatus.color}`}>
                        {h.moisture}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${tempStatus.color}`}>
                        {h.temperature}°C
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const ScheduleContent = () => {
  const {
    events,
    history,
    loading,
    error,
    addSchedule,
    deleteSchedule,
    updateSchedule,
    fetchSchedules,
  } = useSchedule();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", datetime: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setOperationLoading(true);

      try {
        const datetime = new Date(formData.datetime);
        const eventData = {
          title: formData.title.trim(),
          date: datetime.toISOString(),
        };

        const result = isEditing
          ? await updateSchedule(editingId, eventData)
          : await addSchedule(eventData);

        if (result.success) {
          showToast(
            isEditing
              ? "✏️ Sự kiện đã được cập nhật!"
              : "📝 Sự kiện đã được thêm!",
            "success"
          );
          setFormData({ title: "", datetime: "" });
          setIsEditing(false);
          setEditingId(null);
        } else {
          showToast(`❌ ${result.message}`, "error");
        }
      } catch (error) {
        showToast("❌ Có lỗi xảy ra, vui lòng thử lại", "error");
      } finally {
        setOperationLoading(false);
      }
    },
    [formData, isEditing, editingId, addSchedule, updateSchedule, showToast]
  );

  const handleEdit = useCallback((event) => {
    setIsEditing(true);
    setEditingId(event._id);
    setFormData({
      title: event.title || event.name,
      datetime: new Date(event.date).toISOString().slice(0, 16),
    });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: "", datetime: "" });
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?")) {
        setOperationLoading(true);
        try {
          const result = await deleteSchedule(id);
          if (result.success) {
            showToast("🗑️ Đã xóa sự kiện!", "success");
          } else {
            showToast(`❌ ${result.message}`, "error");
          }
        } catch (error) {
          showToast("❌ Có lỗi xảy ra khi xóa", "error");
        } finally {
          setOperationLoading(false);
        }
      }
    },
    [deleteSchedule, showToast]
  );

  const handleRefresh = useCallback(() => {
    fetchSchedules();
    showToast("🔄 Đang làm mới dữ liệu...", "info");
  }, [fetchSchedules, showToast]);

  if (loading && !events.length && !history.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-600">
            Đang tải dữ liệu lịch tưới...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />

      <div className="flex flex-col w-5/6">
        <Header />

        <main className="flex-grow px-8 py-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <FcCalendar className="mr-3" />
              Lịch tưới cây thông minh
            </h1>
            <p className="text-gray-600 text-lg">
              Quản lý lịch tưới và theo dõi lịch sử chăm sóc cây của bạn
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <FcCancel className="mr-2" />
                <span className="text-red-700">{error}</span>
                <button
                  onClick={handleRefresh}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  Thử lại
                </button>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <ScheduleForm
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              onSubmit={handleSubmit}
              onCancel={handleCancelEdit}
              loading={operationLoading}
            />

            <EventsTable
              events={events}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          <HistoryTable
            history={history}
            loading={loading}
            onRefresh={handleRefresh}
          />
        </main>

        <Footer />
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
};

const Schedule = () => (
  <ScheduleProvider>
    <ScheduleContent />
  </ScheduleProvider>
);

export default Schedule;
