package ntou.cs.springboot.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ntou.cs.springboot.entity.Order;
import ntou.cs.springboot.entity.OrderRequest;
import ntou.cs.springboot.entity.QueryParameter;
import ntou.cs.springboot.service.OrderService;

@RestController
@RequestMapping(value = "/repair")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@GetMapping(value = "/info")
	public String hello() {
		return "hello";
	}

	@PostMapping
	public ResponseEntity<Order> createOrder(@Valid @RequestBody OrderRequest request) {
		Order order = orderService.createOrder(request);

		URI location = ServletUriComponentsBuilder
					   .fromCurrentRequest()
					   .path("/{id}")
					   .buildAndExpand(order.getId())
					   .toUri();

		return ResponseEntity.created(location).body(order);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Order> replaceOrder(@PathVariable("id") String missingId, @Valid @RequestBody OrderRequest request) {
		Order order = orderService.replaceOrder(missingId, request);
		return ResponseEntity.ok(order);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Order> deleteOrder(@PathVariable("id") String id) {
		orderService.deleteOrder(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping
	public ResponseEntity<Order> deleteAllOrder() {
		orderService.deleteAllOrder();
		return ResponseEntity.noContent().build();
	}

	@GetMapping
	public ResponseEntity<List<Order>> getOrders(@ModelAttribute QueryParameter param) {
		List<Order> order = orderService.getOrders(param);
		return ResponseEntity.ok(order);
	}

}
