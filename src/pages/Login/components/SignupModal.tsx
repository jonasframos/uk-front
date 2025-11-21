import { 
  Formik,
  Form,
  Field
} from 'formik';
import Modal from '../../../components/Modal/Modal';
import * as Yup from 'yup';
import OutlinedInput from '../../../components/Inputs/OutlinedInput';
import FilledButton from '../../../components/Buttons/FilledButton';
import { useStore } from "../../../store/useStore";

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirm_password: ''
};

const SignupModal: React.FC<{}> = () => {
  const signUp = useStore((state) => state.auth.signUp);
  return (
    <Modal
      title='Registro de conta'
      className='w-[600px]'
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Campo obrigatório'),
          email: Yup.string().email('Email inválido').required('Campo obrigatório'),
          password: Yup.string().required('Campo obrigatório'),
          confirm_password: Yup.string().oneOf([Yup.ref('password')], 'As senhas devem combinar').required('Campo obrigatório')
        })}
        onSubmit={(values) => {
          signUp({ username: values.username, email: values.email, password: values.password, remember_session: false }, () => {});
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className='mt-8 flex flex-col gap-8'>
                  <div className='flex flex-col gap-8 w-full'>
                    <Field
                      placeholder='Nome de Usuário'
                      name='username'
                      component={OutlinedInput}
                    />
                  </div>
                  <div className='flex flex-col gap-8 w-full'>
                    <Field
                      placeholder='Email'
                      name='email'
                      mask
                      component={OutlinedInput}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-8">
                    <Field
                        placeholder="Senha"
                        name="password"
                        type="password"
                        component={OutlinedInput}
                      />
                  </div>
                  <div className="flex-1 flex flex-col gap-8">
                    <Field
                      placeholder="Confirmação de Senha"
                      name="confirm_password"
                      type="password"
                      component={OutlinedInput}
                    />
                  </div>
                <div className='flex gap-5'>
                    <FilledButton className='w-full' type='submit'>
                      Registrar
                    </FilledButton>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default SignupModal;
