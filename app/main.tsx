import { PoppinsFonts } from '@/assets/fonts/poppins.fonts';
import { Button } from '@/components/Button';
import CommentList from '@/components/Comments/CommentList';
import CreateCommentInput from '@/components/Comments/CreateCommentInput';
import Container from '@/components/Container';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { COLORS } from '@/constants/colors';
import { userStore } from '@/store/user.store';
import { CoreStyle } from '@/styles/global';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function MainScreen() {
  const { logout } = userStore;

  const logOutHandler = useCallback(() => {
    logout();
    router.replace('/');
  }, [logout]);

  const renderFooter = useCallback(
    () => <Button title={'Log out'} onPress={logOutHandler} />,
    [logOutHandler],
  );
  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={CoreStyle.flexGrow1}
    >
      <Container mainStyle={CoreStyle.flex1} Footer={renderFooter()}>
        <RN.Text style={styles.title}>{'Comments screen'}</RN.Text>
        <Spacing steps={3} />
        <CreateCommentInput />
        <CommentList />
      </Container>
    </KeyboardAwareScrollView>
  );
}

const styles = RN.StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.orange,
    textAlign: 'center',
  },
});

export default observer(MainScreen);
