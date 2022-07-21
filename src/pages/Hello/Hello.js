import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Confetti from 'react-confetti';

function Hello() {
  return (
    <Main>
      <Section>
        <Content>
          <H3>
            <Title>
              반가워요!
              <br />
              코드런
            </Title>
            에 오신 것을 환영해요 🙌
          </H3>
          <Intro>
            안녕하세요. 가입해주셔서 감사합니다.
            <br />
            코드런은 저희가 공부하면서 느꼈던 학습정보의 부재에서 시작되었어요.
            새로운 것을 배우는데 혼자는 쉽지 않고, 학원은 돈과 시간의 소모가
            크다고 느꼈습니다.
            <Strong>
              배움의 기회는 경제적, 물리적 제약에서 자유로워야 된다고
              생각합니다.
            </Strong>
            &nbsp; 학생에겐 양질의 정보를 전문가에겐 적절한 보상을 제공해 지식의
            질을 높이는 것이 인프런의 목적이에요.
            <br />
            입문자에겐 꿈, 초보자에겐 도약, 전문가에겐 성취의 장이 되었으면
            좋겠습니다.
          </Intro>
          <SubIntro>
            <SubIntroTitle>
              <Strong> 우리는 성장기회의 평등을 추구합니다.</Strong>
            </SubIntroTitle>
            <br />
            함께해 주셔서 감사합니다. 화이팅!!
          </SubIntro>
          <NavButtons>
            <Link to="/courses?charge=free">
              <Button>무료 강의 둘러보기</Button>
            </Link>
            <Link to="/">
              <Button>지금 코드런에서는!</Button>
            </Link>
          </NavButtons>
          <Confetti
            width={1500}
            height={800}
            numberOfPieces={60}
            initialVelocityX={3}
            initialVelocityY={3}
            confettiSource={{ x: 0, y: 100, w: 1500, h: 0 }}
          />
        </Content>
      </Section>
    </Main>
  );
}

export default Hello;

const Main = styled.main`
  min-height: 700px;
`;
const Section = styled.section`
  padding: 5px 4px;
`;
const Content = styled.div`
  max-width: 500px;
  margin: 100px auto;
`;

const H3 = styled.h3`
  font-weight: 400;
  line-height: 1.125;
  font-size: 28px;
  margin-bottom: 30px;
`;
const Title = styled.span`
  font-weight: 800;
`;
const Intro = styled.p`
  font-size: 16px;
  margin: 0;
  line-height: 1.6;
  margin-bottom: 30px;
`;
const Strong = styled.strong`
  font-weight: 700;
`;
const SubIntro = styled.p`
  text-align: center;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
`;
const SubIntroTitle = styled.span`
  color: #169179;
`;
const NavButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    text-decoration: none;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 219px;
  height: 44px;
  font-size: 14px;
  line-height: 1.14;
  border-radius: 4px;
  margin-right: 0;
  margin-top: 12px;
  background-color: #1dc078;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
`;
