export default function AuthLayout({children}){
    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center flex flex-col items-center px-4 md:px-0"
            style={{
                backgroundImage:"url('/login-bg.png')",
                backgroundColor:"#f4ebdf",
            }}
        >
            {/* logo */}
            <div className="mt-8 flex flex-col items-center gap-2">
                <img    
                    src="/logo.png"
                    alt="TeamWave"
                    className="w-10 h-10"
                />
                <h1 className="text-lg font-semibold">TeamWave</h1>
            </div>
            {/* Auth Content container */}
            <div className="mt-6">
                {children}
            </div>
        </div>
    )
}
