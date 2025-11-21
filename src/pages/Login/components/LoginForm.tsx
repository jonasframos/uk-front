import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FilledButton from "../../../components/FilledButton/FilledButton";
import OutlinedInput from "../../../components/FormComponents/OutlinedInput/OutlinedInput";
import ToggleSwitch from "../../../components/FormComponents/ToggleSwitch";
import { useStore } from "../../../store/useStore";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import OutlinedMaskedInput from "../../../components/FormComponents/OutlinedMaskedInput/OutlinedMaskedInput";
import { removeNumberMask } from "../../../utils/functions/formatters";

export const LoginForm: React.FC<{}> = () => {
  const isSignInLoading = useStore((state) => state.auth.isSignInLoading);
  const signIn = useStore((state) => state.auth.signIn);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        cpf: "",
        password: "",
        rememberSession: false,
      }}
      validationSchema={Yup.object().shape({
        cpf: Yup.string()
          .matches(
            /\d{2}\.\d{3}\.\d{3}-\d{2}$/,
            "O CPF deve conter exatamente 11 números"
          )
          .required("Campo obrigatório"),
        password: Yup.string().required("Campo obrigatório"),
        rememberSession: Yup.boolean(),
      })}
      onSubmit={(values) => {
        const newValues = { ...values, cpf: removeNumberMask(values.cpf) };
        signIn(newValues, navigate);
      }}
    >
      <Form>
        <div className="flex flex-col gap-8">
          <Field
            placeholder="Login"
            name="cpf"
            component={OutlinedMaskedInput}
            mask="999.999.999-99"
            alwaysShowMask={false}
          />
          <div className="flex flex-col gap-5 item text-left">
            <Field
              placeholder="Senha"
              name="password"
              type="password"
              component={OutlinedInput}
            />
            <Field
              name="rememberSession"
              component={ToggleSwitch}
              label="Lembrar"
            />
          </div>
          <FilledButton
            className="w-full"
            type="submit"
            loading={isSignInLoading}
          >
            Entrar
          </FilledButton>
          <Link to={ROUTES.FORGOT_PASSWORD.PATH} className="text-red font-bold">
            Esqueci minha senha
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
