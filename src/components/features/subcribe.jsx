import { useDispatch, useSelector } from "react-redux";
import { alertActions, authenticationActions } from "../../store";
import { Button, LinkButton } from "../../components";

import { userService } from "../../services";

import styles from "./subcribe.module.scss";

let delay;
export const Subcribe = () => {
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const onSubscribe = async () => {
    clearTimeout(delay);
    if (authen?.user?.token) {
      await userService.subscribe(true, authen?.user?.token);
      dispatch(
        authenticationActions.update({
          user: { ...authen.user, subscribed: true },
        })
      );
      dispatch(
        alertActions.updateMessage({ message: "Thank you for subscribing!" })
      );
      delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
    }
  };

  if (!authen?.user)
    return (
      <div className={styles.container}>
        <div>
          <p>Join us for </p>
          <p>
            & <span>get 20% discount</span> on your first order
          </p>
          <LinkButton
            url="/signup"
            text="Join us"
            size="medium"
            className={styles.buttonCustom}
          />
        </div>
        <img
          src="/images/haworthia-coarctata-plant.png"
          alt="Haworthia Coarctata Plant"
        />
      </div>
    );
  if (authen && !authen?.user?.subscribed)
    return (
      <div className={styles.container}>
        <div>
          <p>Subcribes for offers, care tips</p>
          <p>
            & get many <span>more promotions</span>
          </p>
          <Button
            text="SUBSCRIBES"
            size="medium"
            className={styles.buttonCustom}
            onClick={onSubscribe}
          />
        </div>
        <img
          src="/images/haworthia-coarctata-plant.png"
          alt="Haworthia Coarctata Plant"
        />
      </div>
    );
};
