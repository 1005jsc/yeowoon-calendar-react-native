import { useState } from 'react';
import { Platform, Text } from 'react-native';
import styled from 'styled-components/native';

type TextBundleType = {
  text: string;
  textLength: number;
};

const initialTextBundle = { text: '', textLength: 0 };

const TextInputTest = () => {
  const [, setFinalText] = useState<string | null>(null);
  const [textBundle, setTextBundle] = useState<TextBundleType>({
    ...initialTextBundle,
  });

  const handleTextChange = (yo: string) => {
    setTextBundle({
      text: yo,
      textLength: yo.length,
    });
  };

  const handleSubmit = () => {
    setFinalText(textBundle.text);
    setTextBundle({ ...initialTextBundle });
  };

  return (
    <>
      <Container2 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Container>
          <TitleView>
            <SampleButtonView />
            <Text>프랑스여행</Text>
            <SampleButtonView />
          </TitleView>
          <TitleView>
            <TitleInput placeholder='제목을 입력해주세요.' />
            <ButtonsWrapper>
              <SampleButtonView />
              <SampleButtonView />
            </ButtonsWrapper>
          </TitleView>
          <InputTextContainer>
            <InputText
              onChangeText={handleTextChange}
              placeholder='hello I am jaesin'
              maxLength={100}
              multiline={true}
              value={textBundle.text}
              onEndEditing={() => console.log('onEndEditing')}
              keyboardType='default'
              onFocus={() => console.log('onFocus')}
              onKeyPress={(e: any) => {
                if (e.nativeEvent.key == 'Enter') {
                  handleSubmit();
                }
              }}
              textAlignVertical='top'
            ></InputText>
            <AbsoluteTextWrapper>
              <AbsoluteText1>{textBundle.textLength}</AbsoluteText1>
              <AbsoluteText2>/</AbsoluteText2>
              <AbsoluteText1>1000</AbsoluteText1>
            </AbsoluteTextWrapper>
          </InputTextContainer>

          {/* <Button title='submit' onPress={handleSubmit}></Button>
          <ResultView>
            <ResultText>{finalText}</ResultText>
          </ResultView> */}
        </Container>
      </Container2>
    </>
  );
};

export default TextInputTest;

const Container2 = styled.KeyboardAvoidingView`
  width: 100%;
  align-items: center;
`;

const InputTextContainer = styled.View`
  width: 100%;
  position: relative;
`;

const AbsoluteText1 = styled.Text`
  font-size: 10px;
  color: #8b8b8b;
`;

const AbsoluteText2 = styled.Text`
  font-size: 10px;

  color: #c1c1c1;
`;

const AbsoluteTextWrapper = styled.View`
  position: absolute;
  bottom: 20px;
  right: 30px;
  flex-flow: row;
`;

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const TitleView = styled.View`
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;
const ButtonsWrapper = styled.View`
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const SampleButtonView = styled.View`
  width: 20px;
  height: 20px;
  background-color: blue;
  margin: 4px;
`;

const TitleInput = styled.TextInput``;

const InputText = styled.TextInput`
  width: 100%;
  height: 350px;
  background-color: #d9d9d9;
`;

const ResultView = styled.View`
  width: 100%;
  height: 100px;
  background-color: #f07e7e;
`;

const ResultText = styled.Text``;
