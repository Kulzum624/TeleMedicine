const Loader = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-white/50 backdrop-blur-sm fixed inset-0 z-[9999]">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg"></div>
                <p className="text-gray-600 font-medium animate-pulse">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
