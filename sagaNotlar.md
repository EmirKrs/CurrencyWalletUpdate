Kısaca mantık şöyle

configureStore ile store yaratırken, reducerlara ilave olarak middleware alanına oluşturduğumuz saga middleware'i ekliyoruz.

App ayağa kalkarken store oluştuğunda, saga middleware'in run fonksiyonuyla rootSaga çalıştırılır ve bu şekilde rootSaga'ya eklediğimiz bütün sagalar devreye girmiş olur.

Bu sagaların watcherları, app ayağa kalktığında çalışır ve belirli (parametre olarak geçilen) action dispatch'lerini dinlemeye başlar.

Watcherlar'ın dinlemesini sağlayan effectler var ve genelde takeEvery kullanılıyo, ama take, takeLatest, takeLeading, takeMaybe gibi farklı effect'ler de var, ihtiyaca/senaryoya göre bunların kullanıldığı durumlar da olabiliyo.

Watcher'ın takeEvery effect'ine iki parametre geçiliyo. İlki action, ikincisi tetiklenecek worker.

Bi action dispatch edildiğinde bütün watcher'lar, gelen action'daki action.type'a bakar,
bu tip ile effect'e geçilen action tipi eşleştiği durumda worker'ı tetikler.

Worker içinde asenkron işlemler (API call), state güncellemeleri için yeni actionların dispatch edilmesi vb. işlemler yapılır.
Error handling için genelde try-catch bloğu ile oluşturulur workerlar.

___


Normalde alıştığımız bazı şeyler saga içerisinde biraz değişiklik gösteriyo.

### State verisi okuma
Mesela bi component içinde selector ile data okurken
```
const isLoading = useSelector(state => state.loading.isLoading);
```
diye alırken, saga worker'ı içinde aynı veriyi şu şekilde okuyoruz:
```
yield select(state => state.loading.isLoading);
```


### Action tetikleme
Benzer şekilde bir component içerisinden action tetiklerken:
```
dispatch(loadingSlice.actions.setLoading(true));
```
şeklinde tetiklerken saga'da:
```
yield put(loadingSlice.actions.setLoading(true));
```
şeklinde tetikleniyo.

### Servis çağırma
Bi servisi çağırırken de direkt
```
service(param1, param2, ...);
```
gibi çağırmak yerine,
```
yield call(service, param1, param2, ...);
```
şeklinde çağırıyoruz saga'da.

**Burdaki call, put, select fonksiyonları saga effect'leri olarak geçiyo. Bunların haricinde farklı effectler de var.**
