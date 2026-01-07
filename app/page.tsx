'use client'

import { useEffect, useState } from "react";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    import('@twa-dev/sdk').then((WebApp) => {
      if (WebApp.default.initDataUnsafe?.user) {
        setUserData(WebApp.default.initDataUnsafe.user as UserData)
      }
      setIsLoading(false)
    }).catch((error) => {
      console.log('Failed to load TWA SDK:', error)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <main className="p-4">
        <div>Initializing Telegram Web App...</div>
      </main>
    )
  }

  return (
    <main className="p-4">  
      {
        userData ?
        (
          <>
          <h1 className="text-2xl font-bold mb-4">User Data</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First name: {userData.first_name}</li>
            <li>Last name: {userData.last_name}</li>
            <li>Username: {userData.username}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium}</li>
          </ul>
          </>
        ) : 
        (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">No User Data Found</h2>
            <p className="text-gray-600">Make sure you're opening this from Telegram</p>
          </div>
        )
      }
    </main>
  );
}
