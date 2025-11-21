import { 
  Field, 
  Form, 
  Formik
} from "formik";
import * as Yup from "yup";
import useModal from "../../../hooks/useModal";
import FilledButton from "../../../components/Buttons/FilledButton";
import { useStore } from "../../../store/useStore";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import OutlinedInput from "../../../components/Inputs/OutlinedInput";
import SignupModal from "./SignupModal";

export const LoginForm: React.FC<{}> = () => {
  const { pushModal } = useModal();
  const isSignInLoading = useStore((state) => state.auth.is_signin_loading);
  const signIn = useStore((state) => state.auth.signIn);
  const openSignupModal = () => {
    pushModal(<SignupModal/>);
  };

  return (
    <Formik
      initialValues={{
        email_username: "",
        password: "",
        remember_session: false,
      }}
      validationSchema={Yup.object().shape({
        email_username: Yup.string().required("Campo obrigatório"),
        password: Yup.string().required("Campo obrigatório"),
        remember_session: Yup.boolean(),
      })}
      onSubmit={(values) => {
        signIn(values, pushModal);
      }}
    >
      <Form>
        <div className="flex flex-col gap-8">
          <Field
            placeholder="Email ou Usuário"
            name="email_username"
            component={OutlinedInput}
          />
          <div className="flex flex-col gap-8">
            <Field
              placeholder="Senha"
              name="password"
              type="password"
              component={OutlinedInput}
            />
          </div>
          <FilledButton
            className="w-full"
            type="submit"
            loading={isSignInLoading}
          >
            Entrar
          </FilledButton>
          <FilledButton
            className="w-full"
            type="button"
            loading={isSignInLoading}
            onClick={openSignupModal}
          >
            Não tenho uma conta
          </FilledButton>
          <Link to={ROUTES.FORGOT_PASSWORD.PATH} className="font-bold">
            Esqueci minha senha
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
