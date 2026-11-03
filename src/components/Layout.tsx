import type { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-md mx-auto">
                {children}
            </div>
        </div>
    )
}

export default Layout