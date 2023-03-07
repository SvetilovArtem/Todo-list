import styles from "@/styles/AddForm.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IShippingFields } from "@/form.interface";
import { addTaskToFirebase } from "@/firebase/firebase";

const AddForm = () => {
  const isAuth = useSelector((state: RootState) => state.todoReducer.isAuth);
  const [isImportant, setIsImportant] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IShippingFields>({
    mode: "onChange",
  });
  const onSubmit = (data: IShippingFields) => {
    if (data) addTaskToFirebase(data).then((e) => setShowMessage(true));
    setTimeout(() => setShowMessage(false), 2000);
  };
  return (
    <>
      {isAuth ? (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="" className={styles.label}>
            todo title
            <input
              type="text"
              className={styles.addInput}
              {...register("title", { required: "Title is required!" })}
            />
            {errors.title && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.title.message}
              </div>
            )}
          </label>
          <label htmlFor="" className={styles.label}>
            category
            <select
              id=""
              className={styles.select}
              {...register("category", { required: "Category is required!" })}
            >
              <option value="" disabled selected>
                choose category...
              </option>
              <option value="my goals">my goals</option>
              <option value="education">education</option>
              <option value="family">family</option>
            </select>
            {errors.category && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.category.message}
              </div>
            )}
          </label>
          <label htmlFor="" className={styles.label}>
            deadline
            <input
              type="date"
              placeholder="select deadline..."
              className={styles.addInput}
              {...register("deadline")}
            />
          </label>
          <label htmlFor="" className={styles.label}>
            description
            <textarea
              id=""
              className={styles.textarea}
              {...register("desc")}
            ></textarea>
          </label>
          <label className={styles.statusBlock}>
            <div className={styles.label + " " + "cursor-pointer max-w-[27px]"}>
              <input
                type="checkbox"
                className={styles.statusBox}
                {...register("status")}
                onChange={() => setIsImportant(!isImportant)}
              />
              <span></span>
            </div>
            {isImportant ? (
              <div className="text-red-400">important</div>
            ) : (
              <div className="text-green-300">no important</div>
            )}
          </label>

          <button type="submit" className={styles.button}>
            add
          </button>
          <button
            type="button"
            className={styles.reset}
            onClick={() => reset()}
          >
            reset
          </button>
          {showMessage && (
            <div className="text-green-400">Note has been added</div>
          )}
        </form>
      ) : (
        <div>Доступно только авторизованным пользователям</div>
      )}
    </>
  );
};

export default AddForm;
