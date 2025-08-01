const AddCommentDialog = ({ data, cancel, confirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl transform transition-all">
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            // 收集表单数据
            const formData = {
              ...data,
              content: e.target.content.value
            };
            confirm(formData); // 将表单数据传递给确认回调
          }}
          className="space-y-4"
        >
          {/* 描述文本框 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              评论
            </label>
            <textarea
              id="content"
              name="content"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* 按钮区域 */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={cancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCommentDialog;