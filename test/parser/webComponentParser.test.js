import { WebComponentParser } from '../../lib/parser/webComponentParser.mjs';

const EXAMPLE_INDEX_FILE = "./example/index.ts";

describe('WebComponentParser', () => {
    
    var parser = null;

    beforeEach(() => {
        parser = new WebComponentParser();    
    });

    it('should not have any analyzedComponent at first', () => {
        expect(parser.analyzedComponents).toEqual([]);
    });
    
  
    describe('parseProject', () => {

        beforeEach(() => {
            parser.parseProject(EXAMPLE_INDEX_FILE);
        });

        it('should load components', () => {
            expect(parser.analyzedComponents.length).toEqual(2);
        });

        it('should load componentA', () => {
            
        });

        it('should load componentB', () => {
            
        });
        
    });
});