import styles from "./Food.module.scss";

export default function Food({ image }) {
  // console.log(image);
  return (
    <div>
      <img src={image} alt="apple" width={25} height={25} />
    </div>
  );
}
