import React, { useState } from "react";
import Head from "next/head";

export default function Room({ room }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 text-white">
      <Head>
        <title>{room} / Games to Loose</title>
      </Head>

      <div>
          <h1>Room {room}</h1>
          <div>
              <h3>Players</h3>
              <ul>
                  <li>You little</li>
              </ul>
          </div>
      </div>
    </div>
  );
}
