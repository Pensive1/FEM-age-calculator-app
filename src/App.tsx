import { useState } from "react";
import DobInput from "./components/DobInput/DobInput.tsx";
import Results from "./components/Results/Results.tsx";

function App() {
  const [resultYears, setResultYears] = useState(null);
  const [resultMonths, setResultMonths] = useState(null);
  const [resultDays, setResultDays] = useState(null);

  return (
    <>
      <main className="container">
        <DobInput
          setResultYears={setResultYears}
          setResultMonths={setResultMonths}
          setResultDays={setResultDays}
        />
        <Results
          resultYears={resultYears}
          resultMonths={resultMonths}
          resultDays={resultDays}
        />
      </main>
    </>
  );
}

export default App;
