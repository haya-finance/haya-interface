import { Box, Typography, Stack } from '@mui/material';
import List from '@mui/material/List';
import TokenColorIcon from 'assets/tokens';



function formatNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.floor(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");



      }
    }
  } else {
    return num.toLocaleString()

  }
}


interface Props {
  onClose: (value: string) => void;
  data: any[]
}

export default function OneTokenList({ onClose, data }: Props) {














  const handleListClick = (value: any) => {

    // console.log('选择', value)
    // const tokens = data.filter(item => item.symbol == value.target.previousSibling.innerText)

    // console.log('tokens', tokens)
    onClose(value);


  };
  return (
    <Box sx={{ width: '100%' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {data?.map((item, index) => {
            return (
              <Box key={index} component="button" sx={{ cursor: 'pointer', width: '100%', backgroundColor: 'transparent', border: 0, padding: "10px 10px 10px 4px", "&:hover": { backgroundColor: '#f6f6f6', borderRadius: '10px' }, "&:focus": { backgroundColor: '#f6f6f6', borderRadius: '10px' } }} onClick={() => handleListClick(item.symbol)} >
                <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                  <Stack direction="row" alignItems="center" spacing="6px">
                    <TokenColorIcon name={item.symbol} size={25} />
                    <Stack>
                      <Typography variant="inherit" sx={{ color: '#000', fontSize: '13px', fontWeight: 400, textAlign: 'start' }}>{item.symbol}</Typography>
                      <Typography variant="inherit" sx={{ color: '#8c8c8c', fontSize: '13px', fontWeight: 400, textAlign: 'start' }}>{item.network}</Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="inherit">{formatNumber(Number(item.balance))}</Typography>

                </Stack>
              </Box>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
