const {getMessage,getLocationMessage}=require('./message');
const expect=require('expect');



describe("generateMessage",()=>{
    it('should generate correct message object',()=>{
        var res=getMessage('admin',"ndfhgdhfg");
        expect(typeof res).toBe('object');
        expect(res.from).toBe('admin');
        expect(res.text).toBe('ndfhgdhfg')
        expect(typeof res.createdAt).toBe('number')
    })
})

describe("generate Location Message",()=>{
    it('should generate correct Location object',()=>{
        var from ='Ravi'
        var lat=15;
        var lng=19;
        var url='https://www.google.com/maps?q=15,19'
        var res=getLocationMessage(from,lat,lng);
        expect(typeof res).toBe('object');
        expect(res.from).toBe('Ravi');
        expect(res.url).toBe(url)
        expect(typeof res.createdAt).toBe('number')
    })
})