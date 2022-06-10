const renderToastComponent = (content, icon, duration) => {
  toast(
    (t) => (
      <ToastContainer
        onClick={() => toast.dismiss(t.id)}
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        {icon && <ToastIcon>{icon}</ToastIcon>}
        <ToastContentWrapper>{content}</ToastContentWrapper>
      </ToastContainer>
    ),
    {
      position: "top-center",
      duration,
      style: { width: "600px", maxWidth: "600px" },
    }
  );
};

export const clientErrorMessage = (msg) => {
  const content =
    res === null ? (
      msg
    ) : (
      <span>
        {msg}
        <br></br> <pre>{safeToString(res)}</pre>
      </span>
    );
  renderToastComponent(content, "❌", 600000);
};
