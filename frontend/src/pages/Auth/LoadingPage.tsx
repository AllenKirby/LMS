const LoadingPage = () => {
    return (
      <div className="w-full h-screen bg-c-green-90 flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50 mb-6"></div>
        <p className="text-xl font-semibold">Loading Learning Management System...</p>
      </div>
    );
  };
  
  export default LoadingPage;
  