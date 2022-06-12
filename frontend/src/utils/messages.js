import React from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

const ToastContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToastIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;

const ToastContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
`;

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
      duration: duration,
      style: { width: "600px", maxWidth: "600px" },
    }
  );
};

export const clientErrorMessage = (msg) => {
  const content = <span>{msg}</span>;
  renderToastComponent(content, "❌", 600000);
};

export const successMessage = (msg) => {
  renderToastComponent(msg, "✅", 5000);
};
