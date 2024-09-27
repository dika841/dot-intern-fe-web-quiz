'use client';
import { signOut, useSession } from "next-auth/react";
import { FC, ReactElement } from "react";
 export const PlaygroundModule:FC = ():ReactElement => {
    const { data: session } = useSession();
    console.log(session?.user);
    if (!session) {
        return <p>Loading...</p>;
    }
    return (
        <div>
           <h1>Welcome to your Dashboard, {session.user?.name}</h1>
           <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}
