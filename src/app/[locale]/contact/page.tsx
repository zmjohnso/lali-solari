"use client";

import { useForm, ValidationError } from "@formspree/react";
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { useTranslations } from "next-intl";

export const runtime = "edge";

export default function Contact({ params }: { params: { locale: string } }) {
  const t = useTranslations("Contact");
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM || ""
  );

  const emailAddress = "hola@lalisolari.com";
  const requiredErrorMessage = t("required");

  return (
    <div className="max-w-screen-sm mx-auto mt-8 px-4">
      <div className="flex flex-col items-center text-center mb-4">
        <h3 className="text-[clamp(1rem,10vw,3rem)] font-open-sans mb-5">
          {t("title")}
        </h3>
        <div className="flex items-center mb-6">
          <MdEmail className="mr-1 text-4xl text-neon-green" />
          <p className="text-[clamp(1rem,2vw,1.5rem)] font-arimo">
            <a href={`mailto:${emailAddress}`} className="text-inherit">
              {emailAddress}
            </a>
          </p>
        </div>
        <div className="w-full bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">{t("message")}</p>
              <input
                type="text"
                name="fullName"
                className="border rounded p-2"
                placeholder={t("fullName")}
                required
              />
              <ValidationError
                prefix="Full Name"
                field="fullName"
                errors={state.errors}
                className="text-red-500"
              />
              <input
                type="email"
                name="email"
                className="border rounded p-2"
                placeholder={t("email")}
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500"
              />
              <textarea
                name="message"
                className="border rounded p-2"
                placeholder={t("yourMessage")}
                required
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-500"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2"
                disabled={state.submitting}
              >
                {t("submit")}
              </button>
            </div>
          </form>
          {state.succeeded && (
            <div className="p-4">
              <p>{t("messageSent")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
