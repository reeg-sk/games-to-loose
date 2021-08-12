import React, { useEffect, useState } from "react";
import Head from "next/head";
import io from "socket.io-client";
import { Continue, New, Planet } from "../components/icons";

export default function Home() {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const toggleModal = () => setCreating(!creating);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setName(username || "");
  }, []);

  // Sockets
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("count", (data) => {
      console.log("Go brrr.. broadcasted ac: " + data.numUsers);
      setCount(data.numUsers);
    });

    socket.on("login", (data) => {
      console.log(data);
      setCount(data.numUsers);
    });
  }, [socket]);

  useEffect(() => {
    localStorage.setItem("username", name);
  }, [name]);

  const createGame = () => {
    if (name) {
      socket.emit("add user", { username: name.trim() });
    } else {
      toggleModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 text-white">
      <Head>
        <title>Games to Loose</title>
      </Head>

      {creating && (
        <>
          <div
            className="absolute bg-black opacity-80 inset-0 z-0"
            onClick={toggleModal}
          ></div>
          <div className="absolute w-full max-w-lg p-5 py-8 mx-auto my-auto rounded-lg shadow-lg bg-gray-800 text-center">
            <div
              className="text-lg top-0 right-2 absolute cursor-pointer"
              title="Close modal"
              onClick={toggleModal}
            >
              &times;
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createGame();
              }}
            >
              <Planet />
              <h2 className="text-3xl mb-3">What's your name?</h2>
              <input
                type="text"
                placeholder="LazyCat332"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block m-auto text-black py-1 px-2 rounded-sm"
                maxLength="12"
                minLength="2"
                autoFocus
                required
              />
              <button
                type="submit"
                className="mt-3 my-2 py-2 px-6 rounded-sm bg-red-700 hover:bg-red-600"
              >
                Continue <Continue />
              </button>
            </form>
          </div>
        </>
      )}

      <div className="flex flex-col items-center py-2 pb-8">
        <img width="128" src="https://cdn.gtl.sk/logo.svg" alt="GTL.SK" />
        <h1 className="font-bold text-4xl">Games To Loose</h1>
      </div>
      <div className="py-2">
        <button
          className="bg-green-700 hover:bg-green-600 py-2 px-6 rounded-sm"
          onClick={() => createGame()}
        >
          Create room{" "}
          <New />
        </button>
        <p className="text-center mt-2 text-sm">{count} active users</p>
      </div>
    </div>
  );
}
