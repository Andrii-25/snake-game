import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import soundOn from "../../images/soundOn.png";
import styles from "./SoundOnButton.module.scss";

function SoundOnButton() {
  const { store } = useContext(Context);
  return (
    <button className={styles.button} onClick={() => store.setSoundOff(true)}>
      <img src={soundOn} alt="soundOn" width={30} height={30} />
    </button>
  );
}

export default observer(SoundOnButton);
