# 03-create-website-layout

1. create .env.local

   ```env
    NEXT_PUBLIC_APP_NAME=NxtAmzn
    NEXT_PUBLIC_APP_SLOGAN=Spend less, enjoy more.
    NEXT_PUBLIC_APP_DESCRIPTION=An Amazon clone built with Next.js and MongoDB
   ```

2. lib/constants.ts

   ```ts
   export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'NxtAmzn'
   export const APP_SLOGAN =
     process.env.NEXT_PUBLIC_APP_SLOGAN || 'Spend less, enjoy more.'
   export const APP_DESCRIPTION =
     process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
     'An Amazon clone built with Next.js and MongoDB'
   ```

3. create logo.svg and save in /public/icons folder
4. app/globals.css

   ```css
   @plugin "daisyui";
   ```

5. app/components/header/header.tsx

```tsx
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <div>
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <Link href="/" className="btn btn-ghost text-lg">
              Next Amazona V2
            </Link>
          </div>
          Menu
        </div>
        <div className="bg-base-300 block md:hidden text-center pb-3">
          SearchBox
        </div>
      </nav>
    </header>
  )
}

export default Header
```

6. create app/layout.tsx

```tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fashion-House',
  description: 'Fashion House Description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
          <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <p>Copyright © 2023 - All right reserved by Next Amazona V2</p>
          </footer>
        </div>
        {children}
      </body>
    </html>
  )
}
```

# 7. create app/(front)/layout.tsx

```tsx
export default function FrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-grow container mx-auto px-4">{children}</main>
}
```
