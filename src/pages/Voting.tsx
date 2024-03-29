import SelectCategorie from "../components/Voting/SelectCategorie";
import Voted from "./voting/Voted";
import SelectContestant from "../components/Voting/SelectContestant";
import useVoting from "../hooks/voting/VotingPageManager";
import "./Voting.css";
import SpammingDetected from "./voting/SpammingDetected";
import SearchBox from "./../components/SearchBox";
import { useCallback, useEffect, useState } from "react";
import { Contestant } from "../hooks/useProject";

const Voting = () => {
  const {
    display,
    renderData,
    categories,
    vote,
    currentSelected,
    selectedCategories,
    changeSelectedContestantPerCategorie,
    setNewCategorie,
    currentVoted,
  } = useVoting();
  const [filteredContestant, setFilteredContestant] = useState<Contestant[]>(
    []
  );

  const filterContestantsByName = useCallback(
    (name: string) => {
      if (name === "") return setFilteredContestant(renderData);
      // Escape special characters in the entered name
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Construct the regular expression dynamically
      const regexPattern: RegExp = new RegExp(`${escapedName}\\w*`, "gi");

      // Use the constructed regular expression to filter contestants
      const filteredContestants = renderData.filter((contestant) => {
        return regexPattern.test(contestant.name);
      });

      setFilteredContestant(filteredContestants);
    },
    [renderData]
  );

  useEffect(() => {
    filterContestantsByName("");
  }, [filterContestantsByName, selectedCategories]);
  return (
    <div className="body container">
      <nav className="container">
        <h1>Ballkönig/-in</h1>
        {categories &&
          categories.map((c, i) => (
            <SelectCategorie
              key={i}
              setCategorie={setNewCategorie}
              selectedCategories={selectedCategories}
              categorie={c}
            />
          ))}
      </nav>
      {renderData.length > 25 && (
        <SearchBox onSearch={filterContestantsByName} />
      )}
      <section className="main">
        {display === "voting" && (
          <section className="container">
            <SelectContestant
              isSelected={(id) => currentSelected?._id === id}
              renderData={filteredContestant}
              selectContestant={changeSelectedContestantPerCategorie}
            />
          </section>
        )}
        {display === "voted" && currentVoted && (
          <Voted name={currentVoted?.name} />
        )}
        {display === "spam" && <SpammingDetected />}
        {display === "banned" && (
          <div className="voted-c">Already voted from this device.</div>
        )}
      </section>
      <footer className="container">
        {currentSelected && display === "voting" && !currentVoted && (
          <div>
            <p>Änderung der Wahl nicht möglich.</p>
            <button className="vote-btn" onClick={vote}>
              Final Abstimmen
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Voting;
