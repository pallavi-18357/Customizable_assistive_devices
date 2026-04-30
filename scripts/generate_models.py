import trimesh
import numpy as np
import os

def create_prosthetic_hand():
    # Create palm
    palm = trimesh.creation.box(extents=[1, 0.5, 0.3])
    
    # Create fingers
    fingers = []
    for i in range(5):
        finger = trimesh.creation.box(extents=[0.15, 0.4, 0.15])
        finger.apply_translation([0, 0.5 + (i * 0.2), 0])
        fingers.append(finger)
    
    # Combine all parts
    hand = trimesh.util.concatenate([palm] + fingers)
    return hand

def create_wheelchair():
    # Create seat
    seat = trimesh.creation.box(extents=[1, 0.1, 1])
    
    # Create backrest
    backrest = trimesh.creation.box(extents=[1, 1, 0.1])
    backrest.apply_translation([0, 0.5, -0.5])
    
    # Create wheels
    wheel1 = trimesh.creation.cylinder(radius=0.3, height=0.1)
    wheel1.apply_translation([0.6, -0.2, 0])
    
    wheel2 = trimesh.creation.cylinder(radius=0.3, height=0.1)
    wheel2.apply_translation([-0.6, -0.2, 0])
    
    # Combine all parts
    chair = trimesh.util.concatenate([seat, backrest, wheel1, wheel2])
    return chair

def create_communication_board():
    # Create base
    base = trimesh.creation.box(extents=[2, 0.1, 1])
    
    # Create buttons
    buttons = []
    for i in range(4):
        button = trimesh.creation.cylinder(radius=0.2, height=0.1)
        button.apply_translation([-0.75 + (i * 0.5), 0.1, 0])
        buttons.append(button)
    
    # Combine all parts
    board = trimesh.util.concatenate([base] + buttons)
    return board

def main():
    # Create output directory if it doesn't exist
    os.makedirs('public/models', exist_ok=True)
    
    # Generate and save models
    models = {
        'prosthetic_hand.glb': create_prosthetic_hand(),
        'wheelchair.glb': create_wheelchair(),
        'communication_board.glb': create_communication_board()
    }
    
    for filename, mesh in models.items():
        # Export as GLB
        mesh.export(f'public/models/{filename}')
        print(f'Generated {filename}')

if __name__ == '__main__':
    main() 