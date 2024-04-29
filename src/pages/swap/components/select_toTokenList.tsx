import { Box, Typography, Stack } from '@mui/material';
import List from '@mui/material/List';
import TokenColorIcon from 'assets/tokens';




interface Props {
  onClose: (value: string) => void;
  data: any[]
}

export default function TokenToList({ onClose, data }: Props) {














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
                      <Typography variant="inherit" sx={{ color: '#000', fontSize: '13px', fontWeight: 400 }}>{item.symbol}</Typography>
                      <Typography variant="inherit" sx={{ color: '#8c8c8c', fontSize: '13px', fontWeight: 400 }}>{item.network}</Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="inherit">{String(Number(item.balance) / (10 ** 18))}</Typography>

                </Stack>
              </Box>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
