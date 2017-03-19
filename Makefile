CSS = tip.css

build: node_modules index.js template.html
	@mkdir -p build
	@browserify \
		--require component-event:event \
		--require query \
		--require ./index.js:tip \
		--outfile build/build.js

build/build.css: $(CSS) | build
	cat $^ > $@

node_modules: package.json
	npm install

clean:
	rm -fr build node_modules

test: build build/build.css
	@open test/index.html

.PHONY: clean test
