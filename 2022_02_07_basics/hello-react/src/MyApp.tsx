
import { useState } from "react";

// クリックした時点の日時を記録して表示する
const ClickRecorder = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div>
      <button onClick={() => setDate(new Date())}>Click Me</button>
      <div>{date ? date.toLocaleTimeString() : 'no data'}</div>
    </div>
  );
};

export const MyApp = () => {
  return <ClickRecorder />;
};