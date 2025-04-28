const Footer = () => {
    return (
      <footer className=" bg-gradient-to-t from-[#1E3E62] to-[#000000] text-gray-400 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-white text-5xl font-bold">FlickPick</h1>
            <p className="mt-2 text-sm">Discover your next favorite movie!</p>
          </div>
  
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="/" className="hover:text-white transition bg-[#0B192C] rounded-full px-3 py-1">Home</a>
            <a href="/liked" className="hover:text-white transition bg-[#0B192C] rounded-full px-3 py-1">Liked</a>
            <a href="/watched" className="hover:text-white transition bg-[#0B192C] rounded-full px-3 py-1">Watched</a>
            <a href="/bookmarked" className="hover:text-white transition bg-[#0B192C] rounded-full px-3 py-1">Bookmarked</a>
          </div>
  
          <div className="text-center md:text-right mt-6 md:mt-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} FlickPick. All rights reserved.</p>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
          Made with ❤️ by Mohit Kumar
        </div>
      </footer>
    );
  };
  
  export default Footer;
  