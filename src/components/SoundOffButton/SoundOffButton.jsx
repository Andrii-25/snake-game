import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import soundOff from "../../images/soundOff.png";
import styles from "./SoundOffButton.module.scss";

function SoundOffButton() {
  const { store } = useContext(Context);
  return (
    <button className={styles.button} onClick={() => store.setSoundOff(false)}>
      <img src={soundOff} alt="soundOff" width={30} height={30} />
    </button>
  );
}

export default observer(SoundOffButton);
