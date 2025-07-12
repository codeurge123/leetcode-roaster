import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState(); // for showing roast later

  const fetchingID = async () => {
    if (!input.trim()) {
      alert('Please Enter Leetcode ID')
      return;
    };

    try {
      const res = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${input}`
      );
      const data = await res.json();

      if (data.status === "success") {
        const transformedUser = {
          username: input,
          profile: {
            realName: `${input}`,
            ranking: data.ranking,
            userAvatar: "https://assets.leetcode.com/users/default_avatar.png",
          },
          totalSolved: data.totalSolved,
          submitStats: {
            acSubmissionNum: [
              { difficulty: "Easy", count: data.easySolved },
              { difficulty: "Medium", count: data.mediumSolved },
              { difficulty: "Hard", count: data.hardSolved },
            ],
          },
        };

        setUserData(transformedUser);
        setInput("");
      } else {
        alert("User not found or error fetching!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Leetcode Roaster</h1>
      <div className="flex justify-center">
        <div className="flex min-h-64 justify-center p-2 mt-8 border-2 border-black w-2/4 rounded-xl shadow-xl">
          <div className="p-2 bg-sky-400 h-11 border rounded-xl">
            <h3 className="text-orange-50 font-bold mb-10 p-0">
              🔥 Ready for Roast 🔥
            </h3>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-b-2 border-black p-1 outline-offset-1 w-full mb-10 rounded-lg active:translate-y-[-0.5px] transition-all duration-75"
              placeholder="Enter Leetcode ID"
            />
            <button
              onClick={fetchingID}
              className="p-2 bg-blue-600 rounded-2xl shadow-xl font-bold text-white pl-3 pr-3 hover:bg-blue-700 active:-translate-y-[-1px] transition-all duration-75"
            >
              Get Roast
            </button>
            {/* consitional statement */}
            {userData && (
              <div className="mt-5 bg-white p-4 border border-gray-300 rounded-xl shadow-md text-left">
                <h2 className="text-xl font-bold mb-2">
                  🔥 Roast Report for {userData.username}
                </h2>
                <p>👤 Real Name: {userData.profile.realName || "Anonymous"}</p>
                <p>🏅 Ranking: {userData.profile.ranking}</p>
                <p>
                  🧩 Easy Solved:{" "}
                  {userData.submitStats.acSubmissionNum[0].count}
                </p>
                <p>
                  🧩 Medium Solved:{" "}
                  {userData.submitStats.acSubmissionNum[1].count}
                </p>
                <p>
                  🧩 Hard Solved:{" "}
                  {userData.submitStats.acSubmissionNum[2].count}
                </p>
                <p>🧩 Total Solved: {userData.totalSolved}</p>

                {/* Easy Roast */}
                {userData.submitStats.acSubmissionNum[0].count < 10 && (
                  <p className="text-red-600 mt-2 font-semibold">
                    Bro, even my printer solved more Easy questions than you! 😭
                  </p>
                )}
                {userData.submitStats.acSubmissionNum[0].count >= 10 &&
                  userData.submitStats.acSubmissionNum[0].count < 100 && (
                    <p className="text-yellow-700 mt-2 font-semibold">
                      You’re crawling through Easy questions like it’s a
                      minefield 😬
                    </p>
                  )}
                {userData.submitStats.acSubmissionNum[0].count >= 100 && (
                  <p className="text-green-700 mt-2 font-semibold">
                    Okay okay, Easy isn’t that hard for you 🔥
                  </p>
                )}

                {/* Medium Roast */}
                {userData.submitStats.acSubmissionNum[1].count < 20 && (
                  <p className="text-red-600 mt-2 font-semibold">
                    Mediums giving you trauma? Or are you allergic to logic? 🤕
                  </p>
                )}
                {userData.submitStats.acSubmissionNum[1].count >= 20 &&
                  userData.submitStats.acSubmissionNum[1].count < 200 && (
                    <p className="text-yellow-700 mt-2 font-semibold">
                      Not bad, but Medium is still your mid-life crisis 😵
                    </p>
                  )}
                {userData.submitStats.acSubmissionNum[1].count >= 200 && (
                  <p className="text-green-700 mt-2 font-semibold">
                    Mediums? You’re chewing them for breakfast. Beast mode! 🐗
                  </p>
                )}

                {/* Hard Roast */}
                {userData.submitStats.acSubmissionNum[2].count === 0 && (
                  <p className="text-red-600 mt-2 font-semibold">
                    Not even a single Hard solved? Bro, my toaster’s braver than
                    you 😭
                  </p>
                )}
                {userData.submitStats.acSubmissionNum[2].count >= 1 &&
                  userData.submitStats.acSubmissionNum[2].count < 50 && (
                    <p className="text-yellow-700 mt-2 font-semibold">
                      You touched Hard questions but they touched you back
                      harder 💀
                    </p>
                  )}
                {userData.submitStats.acSubmissionNum[2].count >= 50 && (
                  <p className="text-green-700 mt-2 font-semibold">
                    Hard problems? You eat ‘em raw with recursion sauce 🔥
                  </p>
                )}

                {/* Ranking Roast */}
                {userData.profile.ranking > 100000 && (
                  <p className="text-red-600 mt-2 font-semibold">
                    With that rank, you're hiding in the shadow realm 🌚
                  </p>
                )}
                {userData.profile.ranking <= 100000 &&
                  userData.profile.ranking > 10000 && (
                    <p className="text-yellow-700 mt-2 font-semibold">
                      Decent rank, but you’re still far from greatness 😤
                    </p>
                  )}
                {userData.profile.ranking <= 10000 && (
                  <p className="text-green-700 mt-2 font-semibold">
                    Respect 🫡 Your rank is sharper than most resumes.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
