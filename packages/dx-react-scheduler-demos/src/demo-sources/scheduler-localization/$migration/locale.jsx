import deMessages from 'devextreme/localization/messages/de.json';
import frMessages from 'devextreme/localization/messages/fr.json';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';

const DEFAULT_LOCALE = 'fr-FR';

const getLocale = () => sessionStorage.getItem('locale') || DEFAULT_LOCALE;

locale(getLocale());

loadMessages(deMessages);
loadMessages(frMessages);

export default () => {
  const [locale, setLocale] = useState(getLocale());
  
  const onLocaleChange = useCallback(e => {
    sessionStorage.setItem('locale', e.target.value);
    setLocale(e.target.value);
    document.location.reload();
  }, []);

  return (
    <React.Fragment>
      <LocaleSwitcher
        currentLocale={locale}
        onLocaleChange={onLocaleChange}
      />
      <Scheduler
        dataSource={data}
        height={660}
        textExpr="title"
        defaultCurrentDate={currentDate}        
      >
        <View
          type="week"
          startDayHour={9}
          endDayHour={19}
        />
      </Scheduler>
    </React.Fragment>
  );
};