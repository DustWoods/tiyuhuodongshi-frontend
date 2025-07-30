
const ConfirmationDialog = ({cancel, confirm, prompt}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl transform transition-all">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{prompt.first}</h3>
            <p className="text-sm text-gray-600 mb-4">{prompt.second}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirm}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
    )
}

export default ConfirmationDialog