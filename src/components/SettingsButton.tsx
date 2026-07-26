import { Link, useParams, useSearchParams } from "react-router";
import styled from "styled-components";

const SubmitLink = styled(Link)`
  width: 40px;
  height: 30px;
  position: absolute;
  top: 2vh;
  right: 2vw;
  background-color: var(--btn-primary-bg);
  border: none;
  cursor: pointer;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--btn-primary-text);
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(45deg);
  }

  @media (max-width: 768px) {
    width: 54px;
    height: 44px;
    border-radius: 8px;

    svg {
      width: 26px;
      height: 26px;
    }
  }
`;

const SettingsButton = () => {
  const { diceId } = useParams<{ diceId: string }>();
  const [searchParams] = useSearchParams();

  return (
    <SubmitLink
      to={`/${diceId}/settings?${searchParams.toString()}`}
      aria-label="Dice settings"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l-.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3-1.07-3-3s1.07-3 3-3s3 1.07 3 3s-1.07 3-3 3z" />
      </svg>
    </SubmitLink>
  );
};

export default SettingsButton;
