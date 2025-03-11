import { COLORS } from '@/constants/colors';
import RN from '../RN';

import { FormInput } from '../FormController';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import useComments from '@/hooks/useComments';
import { userStore } from '@/store/user.store';
import { Button } from '../Button';
import { observer } from 'mobx-react-lite';

const schema = yup.object({
  comment: yup.string().required('Comment is required'),
});
const CreateCommentInput = () => {
  const [shouldTriggerError, setShouldTriggerError] = useState(false);
  const { createCommentHandler, isLoadingOfCreateComment } = useComments();
  const currentUserId = userStore.currentUser?.id || '';

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: '',
    },
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSendComment = handleSubmit(
    async (formValues) => {
      if (currentUserId) {
        await createCommentHandler(
          {
            message: formValues.comment,
            userId: currentUserId,
          },
          () => {
            reset();
          },
        );
      }
    },
    (_error) => {
      setShouldTriggerError(true);
    },
  );
  return (
    <RN.View style={styles.container}>
      <RN.View w={'80%'}>
        <FormInput
          control={control}
          name={'comment'}
          placeholder={'Enter your comment'}
          shouldTriggerError={shouldTriggerError}
        />
      </RN.View>
      <Button
        title={'Send'}
        onPress={onSendComment}
        loading={isLoadingOfCreateComment}
        titleStyle={styles.buttonText}
        style={styles.button}
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    gap: 10,
  },
  button: {
    minHeight: 40,
    backgroundColor: COLORS.orange,
    width: 'auto',
    paddingVertical: 0,
    paddingHorizontal: 0,
    flex: 1,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
  },
});

export default observer(CreateCommentInput);
