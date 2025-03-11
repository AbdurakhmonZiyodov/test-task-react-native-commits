import { PoppinsFonts } from '@/assets/fonts/poppins.fonts';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/Button';
import Container from '@/components/Container';
import { FormInput } from '@/components/FormController';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { COLORS } from '@/constants/colors';
import useUsers from '@/hooks/useUsers';
import { CoreStyle } from '@/styles/global';
import { emailSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';

const schema = yup.object({
  email: emailSchema,
});

function LoginScreen() {
  const [shouldTriggerError, setShouldTriggerError] = useState(false);
  const { loginUserHandler, isLoadingOfLoginUser } = useUsers();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const navigateToBackHandler = useCallback(() => {
    router.back();
  }, []);

  const onSubmitHandler = handleSubmit(
    async (formValues) => {
      await loginUserHandler(formValues.email, () => {
        reset();
        setShouldTriggerError(false);
      });
    },
    (_error) => {
      setShouldTriggerError(true);
    },
  );

  const renderFooter = useCallback(
    () => (
      <RN.View>
        <Button
          title={'Login'}
          onPress={onSubmitHandler}
          loading={isLoadingOfLoginUser}
        />
        <Spacing />
      </RN.View>
    ),
    [isLoadingOfLoginUser, onSubmitHandler],
  );

  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={CoreStyle.flexGrow1}
    >
      <Container
        style={styles.container}
        isScroll={true}
        Footer={renderFooter()}
        Header={<BackButton />}
      >
        <RN.Text style={styles.title}>{'User Login'}</RN.Text>

        <Spacing steps={3} />
        <RN.View g={10}>
          <FormInput
            control={control}
            name={'email'}
            placeholder={'Enter your email'}
            shouldTriggerError={shouldTriggerError}
          />
        </RN.View>
        <Spacing />
        <RN.TouchableOpacity onPress={navigateToBackHandler}>
          <RN.Text style={styles.text}>
            {'No account yet? '}
            <RN.Text style={styles.boldText}>{'Register now.'}</RN.Text>
          </RN.Text>
        </RN.TouchableOpacity>
      </Container>
    </KeyboardAwareScrollView>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.orange,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: PoppinsFonts.Poppins_400,
    color: COLORS.black,
  },
  boldText: {
    fontFamily: PoppinsFonts.Poppins_600,
  },
});

export default observer(LoginScreen);
