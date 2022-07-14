import { Container, Header } from '@pages/DirectMessage/styles';
import fetcher from '@utils/fetcher';
import React from 'react';
import gravatar from 'gravatar';
import { useParams } from 'react-router';
import useSWR from 'swr';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  // (워크스페이스에 초대된)유저 정보
  const { data: userData } = useSWR(
    `/api/workspaces/${workspace}/users/${id}`,
    fetcher,
  );

  // 내 정보
  const { data: myData } = useSWR(`/api/users`, fetcher);

  if (userData) {
    console.log('userData', userData);
  }
  console.log();
  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}
          alt={userData.nickname}
        />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox chat="" />
    </Container>
  );
};

export default DirectMessage;
