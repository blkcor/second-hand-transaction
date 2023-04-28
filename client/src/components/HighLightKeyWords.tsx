import React from 'react';

type HighLightKeyWordsProps = {
  content: string,
  keyword: string
};

const HighLightKeyWords: React.FC<HighLightKeyWordsProps> = ({ content, keyword }) => {

  //使用正则表达式进行匹配
  const reg = new RegExp(keyword, 'gi');
  const matchContent = content.match(reg);
  const result = content.replace(reg, `<span style="color:red">${(matchContent as RegExpMatchArray)[0]}</span>`);
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: result }} className='keyword'></span>
    </>
  )
}
export default HighLightKeyWords;
