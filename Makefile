
build: tip.css index.js template.html components
	@component build --dev

build-browserify: node_modules index.js template.html
	@mkdir -p build
	@browserify \
		--require component-event:event \
		--require query \
		--require ./index.js:tip \
		--outfile build/build.js

components: component.json
	@component install --dev

clean:
	rm -fr build components node_modules

test: build
	@open test/index.html

.PHONY: clean test
