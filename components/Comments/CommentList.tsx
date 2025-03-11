import { Comment } from '@/@types';
import { commentsStore } from '@/store/comments.store';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import RN from '../RN';
import CommentItem from './CommentItem';
import { orderBy } from 'lodash';
import { PoppinsFonts } from '@/assets/fonts/poppins.fonts';
import { COLORS } from '@/constants/colors';

const CommentList: React.FC = () => {
  const comments = commentsStore.comments;
  const sortedComments = orderBy(comments, ['timestamp'], ['desc']);

  const renderComment: ListRenderItem<Comment> = useCallback(
    ({ item }) => <CommentItem {...item} />,
    [],
  );

  return (
    <RN.FlatList
      data={sortedComments}
      renderItem={renderComment}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        <RN.Text style={styles.title}>{'No comments yet.'}</RN.Text>
      }
      contentContainerStyle={styles.container}
    />
  );
};

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.orange,
    textAlign: 'center',
    paddingTop: 20,
  },
});

export default observer(CommentList);
