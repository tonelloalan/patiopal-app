export default function MessageBoard() {
  return (
    <>
      <h3>Hello! This is a Message Board</h3>

      <div style={{ textAlign: "left" }}>
        <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>A. Tonello</span>, on
            26.02.2023 15:54
          </p>
        </span>
        <p
          style={{
            backgroundColor: "white",
            borderRadius: "13px",
            padding: "8px",
            margin: "0",
            marginBottom: "25px",
          }}
        >
          This is a sample message.
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>C. Amend</span>, on 26.02.2023
            15:57
          </p>
        </span>
        <p
          style={{
            backgroundColor: "#B0B6AC",
            borderRadius: "13px",
            padding: "8px",
            margin: "0",
            marginBottom: "25px",
          }}
        >
          This is another sample message. 🙋
        </p>
      </div>
      <div style={{ textAlign: "left" }}>
        <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>A. Tonello</span>, on
            26.02.2023 16:00
          </p>
        </span>
        <p
          style={{
            backgroundColor: "white",
            borderRadius: "13px",
            padding: "8px",
            margin: "0",
            marginBottom: "25px",
          }}
        >
          This is a sample message yet again. 👋
        </p>
      </div>
      <div style={{ textAlign: "left" }}>
        <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>J. Schneider</span>, on
            26.02.2023 16:04
          </p>
        </span>
        <p
          style={{
            backgroundColor: "white",
            borderRadius: "13px",
            padding: "8px",
            margin: "0",
            marginBottom: "25px",
          }}
        >
          This is a sample message, so many 😅
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>C. Amend</span>, on 26.02.2023
            16:13
          </p>
        </span>
        <p
          style={{
            backgroundColor: "#B0B6AC",
            borderRadius: "13px",
            padding: "8px",
            margin: "0",
            marginBottom: "25px",
          }}
        >
          Cool chat, guys. 👏
        </p>
      </div>
      <input placeholder="Type your message here..." />
      <button>Send</button>
    </>
  );
}
