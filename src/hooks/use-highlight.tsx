import styled from 'styled-components';

const useHighlight = (title: string, value: string) => {
  if (value !== '' && title.includes(value)) {
    const parts = title.split(new RegExp(`(${value})`, 'gi'));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === value.toLowerCase() ? <Highlight key={index}>{part}</Highlight> : part,
        )}
      </>
    );
  }

  return title;
};

const Highlight = styled.span`
  font-weight: bold;
`;

export default useHighlight;
