const {getMessage}=require('./message');
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