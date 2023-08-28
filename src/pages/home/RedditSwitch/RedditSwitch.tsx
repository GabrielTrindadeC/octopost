// import { useSearchParams } from 'react-router-dom';

import Switch from '~components/Switch/Switch';

import { useReddit } from './../../../stores/reddit/redditStore';

function RedditSwitch() {
  //   const [searchParams] = useSearchParams();

  const check = useReddit((state) => state.checked);
  const token = useReddit((state) => state.redditAcessToken);
  const setCheck = useReddit((state) => state.setChecked);
  const setToken = useReddit((state) => state.setToken);
  //   const redditUserName = useReddit((state) => state.userName);
  const handleCheck = () => {
    setCheck(!check);
  };
  //
  return (
    <>
      <p>reddit username:{token}</p>
      <button
        onClick={() => {
          setToken();
        }}
      >
        aASSADADSHJIFUHQAWSEFIUHJCDSVAXIACSD
      </button>
      <Switch checked={check} setChecked={handleCheck} />
    </>
  );
}

export default RedditSwitch;
