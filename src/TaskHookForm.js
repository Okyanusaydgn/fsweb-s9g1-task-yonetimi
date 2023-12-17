import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });

  useEffect(() => {}, []);

  const submitForm = (formData) => {
    console.log("formData >", formData);
    submitFn({
      ...formData,
      status: "yapılacak",
      id: Math.round(Math.random() * 99999999999),
    });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(submitForm)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title")}
          // yukarıdaki satırın içine bakarsak --> name: "title" , value: valState, onChange: titleChangeHandler }
        />
        <p className="input-error">{errors?.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description")}
        ></textarea>
        <p className="input-error">{errors?.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  minLength: {
                    value: 1,
                    message: "En az bir kişi seçilmelidir...",
                  },
                })}
                // onChange={handleCheckboxChange}
                // checked={formData.people.includes(p)}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors?.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
