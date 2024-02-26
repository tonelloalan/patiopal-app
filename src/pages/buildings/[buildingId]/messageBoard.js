export default function MessageBoard() {
  return (
    <>
      <h3>Hello! This is a Message Board</h3>

      <div style={{ textAlign: "left" }}>
        <span style={{ fontSize: "x-small" }}>
          <p>A. Tonello, on 26.02.2023 15:54</p>
        </span>
        <p
          style={{
            backgroundColor: "white",
            borderRadius: "13px",
            padding: "8px",
          }}
        >
          This is a sample message.
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <span style={{ fontSize: "x-small" }}>
          <p>C. Amend, on 26.02.2023 15:57</p>
        </span>
        <p
          style={{
            backgroundColor: "#B0B6AC",
            borderRadius: "13px",
            padding: "8px",
          }}
        >
          This is another sample message. 🙋
        </p>
      </div>
      <div style={{ textAlign: "left" }}>
        <span style={{ fontSize: "x-small" }}>
          <p>A. Tonello, on 26.02.2023 16:00</p>
        </span>
        <p
          style={{
            backgroundColor: "white",
            borderRadius: "13px",
            padding: "8px",
          }}
        >
          This is a sample message yet again. 👋
        </p>
      </div>
      <div style={{ textAlign: "left" }}>
        <span style={{ fontSize: "x-small" }}>
          <p>J. Schneider, on 26.02.2023 16:04</p>
        </span>
        <p
          style={{
            backgroundColor: "white",
            borderRadius: "13px",
            padding: "8px",
          }}
        >
          This is a sample message, so many 😅
        </p>
      </div>
      <input placeholder="Type your message here..." />
      <button>Send</button>
    </>
  );
}
